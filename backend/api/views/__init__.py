from api.views.project import ProjectAPI
from api.views.asset import AssetAPI, AssetListByProjectAPI, AssetListByAreaAliasAPI, AssetMultiFuncAPI
from api.views.vulnerability import VulnerabilityAPI, VulnerabilityListByAssetAPI, VulnerabilityListByAreaAPI
from api.views.authentication import SignUpAPI, SignInAPI, UserInfoGetAPI, UserListAPI
from api.views.compliance import ComplianceListAPI, PlatformListAPI
from api.views.realgrid import RealGridAssetAPI, RealGridVulAPI
from api.views.poc import POCDetailUpdateDeleteAPI
from api.views.upload_file import ScreenShotAPI, ScreenShotByVulAPI, ReferFileAPI, ReferFileByVulAPI
from api.views.statistics import getAreaStatistic