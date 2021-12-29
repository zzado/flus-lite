from django.db import models
from django.db.models.signals import post_delete
from django.dispatch.dispatcher import receiver
import os, base64


def get_screenshot_upload_to(instance, filename):
    newFilename = instance.vulnerability.get_vulnerability_screenshot_id()
    projectId = instance.vulnerability.project.id
    areaAlias = instance.vulnerability.asset.area_alias
    cntImage = Screenshot.objects.filter(vulnerability=instance.vulnerability, image__contains=f'project/{projectId}/screenshot/{areaAlias}/{newFilename}').count()+1
    fileExt = os.path.splitext(filename)[-1].lower()
    #savePath = f'project/{projectId}/reffile/{vulId}/{filename}'
    savePath = f'project/{projectId}/screenshot/{areaAlias}/{newFilename}_{cntImage}{fileExt}'
    return savePath

class Screenshot(models.Model):
    vulnerability = models.ForeignKey('Vulnerability', related_name='screenshots', on_delete=models.CASCADE,)
    image = models.ImageField('스크린샷', upload_to=get_screenshot_upload_to)

    def get_filename(self):
        return self.image.name.split('/')[-1]

    def get_ext(self) :
        return self.image.name.split('.')[-1].lower()

    def get_encoded_data(self):
        data = self.image.file.read()
        encodedData = base64.b64encode(data)
        encodedData = f'data:image/{self.get_ext()};base64, {encodedData.decode()}'
        return encodedData

@receiver(post_delete, sender=Screenshot)
def _screenshot_delete(sender, instance, **kwargs):
    try:
        os.remove(instance.image.path)
    except OSError:
        pass