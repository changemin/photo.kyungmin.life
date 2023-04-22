from PIL import Image, ExifTags
import requests
# import config
import os, json, shutil
from datetime import datetime
from GPSPhoto import gpsphoto
from geopy.geocoders import Nominatim



# 사진의 EXIF 데이터를 기반으로 사진 파일 이름을 바꾸어 줍니다.
def rename_photos_with_exif():
    # os.remove("photos/.DS_Store")
    print("[Python] rename photos with exif data")
    file_list = os.listdir("photos")
    file_list.sort()
    for cnt, photo in enumerate(file_list):
        img = Image.open(f"./photos/{photo}")
        img_exif = img.getexif()

        exif_data = {}
        if img_exif is None:
            print('Sorry, image has no exif data.')
        else:
            for key, val in img_exif.items():
                if key in ExifTags.TAGS:
                    exif_data[ExifTags.TAGS[key]] = str(val).replace(":", "-") # collect all the exif tags
        print(exif_data)
        timeStr =exif_data['DateTime'].split(' ')[1]

        f_stats = os.stat(f"./photos/{photo}")
        c_time = datetime.fromtimestamp(f_stats.st_ctime)
        print("파일 생성된 날짜와 시간:", c_time)


        new_filename = f"{exif_data['DateTime'].split(' ')[0]}@{timeStr}@{cnt+1}@{photo.split('@')[3] if len(photo.split('@')) > 3 else photo}"
        print(new_filename)
        img.close()
        os.rename(f"photos/{photo}", f"photos/{new_filename}")

# Photo 폴더의 사진들을 기반으로 React에서 활용할 수 있도록 src/data/Photodata.json 을 생성.
# 실행 하기 전에 rename_photos_with_exif() 가 실행되어있어야 함.
def generate_json_photo_data():
    print("[Python] data/PhotoData.json has created(modified)")
    file_list = os.listdir("photos")
    file_list.sort(reverse=True)
    photo_list = []
    for photo in file_list:
        photo_data = {}
        photo_data["FilePath"] = photo
        photo_data["DateTime"] = photo.split("@")[0]
        photo_data["Idx"] = photo.split("@")[2]
        photo_data["Title"] = photo.split("@")[3][:-4]
        photo_data["Description"] = ""
        locationData = get_image_location(f"photos/{photo}")
        
        geolocator = Nominatim(user_agent="South Korea") # user_agent는 사용자 지정 문자열입니다.
        latitude = locationData[0]
        longitude = locationData[1]
        # location = geolocator.reverse(f"{latitude}, {longitude}")
        # address = location.address.split(", ")
        # addressStr = " ".join(reversed(address[-5:-2]))
        Location = {
            "Latitude":latitude,
            "Longitude":longitude,
            "StringLocation": ""
        }
        # print(Location)
        # print(addressStr)
        photo_data["Location"] = Location
        photo_data["InstagramUploaded"] = False
        photo_list.append(photo_data)

    jsonStr = json.dumps(photo_list, ensure_ascii = False, sort_keys=True, indent=4)
    json_file_path = "src/data/PhotoData.json"
    json_file = open(json_file_path, "w", encoding="utf-8")
    json_file.write(jsonStr)
    json_file.close()

def update_marquee_text():
    print("[Python] Marquee texts updated based on photo data")
    with open("./src/data/FlowingTextData.json", 'r', encoding="utf-8") as jsonFile:
        textData = json.load(jsonFile)
        rightTexts = []
        for rightText in textData["right"]:
            if not (("업데이트" in rightText) or ("시선들" in rightText)):
                rightTexts.append(rightText)
        rightTexts.append(f"{get_photo_count()}개의 시선들")
        dateStr = datetime.today().strftime('%Y.%m.%d')
        rightTexts.append(f"마지막 업데이트: {dateStr}")
    textData["right"] = rightTexts
    with open("./src/data/FlowingTextData.json", 'w', encoding="utf-8") as jsonFile:
        json.dump(textData, jsonFile,ensure_ascii = False, sort_keys=True, indent=4)


# photos/ 의 사진들을 src/photos/로 이동합니다.
def copy_photos():
    print("[Python] reset src/photos folder and copy all the photos")
    reset_src_photos()

    origin_folder = "./photos"
    destination_folder = "./src/photos"

    for file_name in os.listdir(origin_folder):
        source_file = os.path.join(origin_folder, file_name)
        destination_file = os.path.join(destination_folder, file_name)
        shutil.copy(source_file, destination_file)

# src/photos/의 사진들을 압축합니다.
def optimize_photos(quality):
    target_folder = "./src/photos"
    for photo in os.listdir(target_folder):
        photo_path = os.path.join(target_folder, photo)
        if os.path.isfile(photo_path):
            img = Image.open(photo_path)
            img.save("./src/photos/_"+photo, optimize=True, quality=quality)

    for photo in os.listdir(target_folder):
        photo_path = os.path.join(target_folder, photo)
        if os.path.isfile(photo_path):
            if photo[0] != "_":
                os.remove(photo_path)
                os.rename("./src/photos/_"+photo, photo_path)
 

# src/photos/의 사진들을 모두 삭제합니다.
def reset_src_photos():
    folder_path = "src/photos"
    for photo in os.listdir(folder_path):
        photo_path = os.path.join(folder_path, photo)
        if os.path.isfile(photo_path):
            os.remove(photo_path)

def get_photo_count():
    photos = os.listdir("./src/photos")
    return len(photos)

def get_image_location(image_path):
    """
    Returns the latitude and longitude of an image file if it has GPS data.
    """
    data = gpsphoto.getGPSData(image_path)
    if data:
        lat = data['Latitude']
        long = data['Longitude']
        return (lat, long)
    return (0,0)

# graph_url = 'https://graph.facebook.com/v15.0/'
# def post_image(caption='', image_url='',instagram_account_id='',access_token=''):
#     url = graph_url + instagram_account_id + '/media'
#     param = dict()
#     param['access_token'] = access_token
#     param['caption'] = caption
#     param['image_url'] = image_url
#     response = requests.post(url, params=param)
#     response = response.json()
#     return response

# post_image("hello", "../photos/placeholder.png", config.app_id, config.secret_code)