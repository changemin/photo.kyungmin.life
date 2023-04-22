import utils

utils.rename_photos_with_exif()
utils.generate_json_photo_data()
utils.copy_photos()
# utils.optimize_photos(quality=40)
utils.update_marquee_text()

print(f"총 {utils.get_photo_count()}개의 시선들.")