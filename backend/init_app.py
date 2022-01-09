#import os.path, datetime, os, MySQLdb, time
import os, datetime, MySQLdb, time, sys, time, json
from flus_lite import settings

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
G_PYTHON = "python"
G_TABLE_COUNT = 22

BUILD_INFO_PATH = f'{BASE_DIR}/log/FLUS_BUILD_INFO'
now = datetime.datetime.now()
BUILD_DATE = now.strftime('%Y.%m.%d')

def main():
    if len(sys.argv) != 2 :
        printHelpMessage()
        return 

    if sys.argv[1] == "run" :
        tempTableCount = checkDB()
        if tempTableCount == G_TABLE_COUNT :
            runApp()
        else :
            initCheck(tempTableCount)
            runApp()

    elif sys.argv[1] == "init" :
        initCheck(checkDB())
        
    elif sys.argv[1] == "help" :
        printHelpMessage()
    else :
        print("Wrong Command")

def printHelpMessage():
    print('[*] Commnad List\n - help : display this message\n - init : init database and setting for running app\n - run : init & run app\n\n ex) python3 init_app.py run')

def checkDB() :
    while True :
        try :
            dbConn = MySQLdb.connect(host=os.environ.get("SQL_HOST", "localhost"), user=os.environ.get("SQL_USER", settings.DB_USER), passwd=os.environ.get("SQL_PASSWORD", settings.DB_PASS), db=os.environ.get("SQL_DATABASE", settings.DB_NAME))
            if dbConn:
                print("[+] Database Connected")
                #os.system('{G_PYTHON} /flus/manage.py showmigrations')
                dbCur = dbConn.cursor()
                tableCount = dbCur.execute("SHOW TABLES")
                dbCur.close()
                dbConn.close()
                break
        except :
            print("[-] Database health check...")
            time.sleep(1)
    return tableCount


def initCheck(tableCount) :
    if tableCount != G_TABLE_COUNT:
        os.system(f'{G_PYTHON} {BASE_DIR}/manage.py migrate')
        os.system(f'{G_PYTHON} {BASE_DIR}/manage.py loaddata {BASE_DIR}/tempdata/compliances.json')
        os.system(f'{G_PYTHON} {BASE_DIR}/manage.py loaddata {BASE_DIR}/tempdata/compliance_areas.json')
        os.system(f'{G_PYTHON} {BASE_DIR}/manage.py loaddata {BASE_DIR}/tempdata/total_vulnerability_items.json')
        print('[+] Initialize Done!')
    else :
        os.system(f'{G_PYTHON} {BASE_DIR}/manage.py clearsessions')
        print("[+] Already Initialized!")
    

def runApp():
    os.system(f'{G_PYTHON} {BASE_DIR}/manage.py runserver 0.0.0.0:8000')

if __name__ == "__main__":
    main()