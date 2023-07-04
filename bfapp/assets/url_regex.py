import re


def bookbeat_url_regex(url, offset):
    # Find the "offset=" parameter and the number following it
    match = re.search(r"(?<=offset=)\d+", url)

    if match:
        current_offset = match.group(0)
        # Replace the current offset value with the new offset value
        updated_url = re.sub(r"(?<=offset=)\d+", str(offset), url)
    else:
        print("Offset not found in the URL")
    return updated_url
