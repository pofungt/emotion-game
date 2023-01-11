import pytest
import json
from unittest.mock import MagicMock
from controller import stream
from sanic.request import Request


@pytest.mark.parametrize(
    "image_json, expected_response",
    [
        (
            {"img": "data:image/jpeg+;base64,abc123"},
            {"uploaded": True, "result": "detected"},
        ),
    ],
)
@pytest.mark.asyncio
async def test_stream_request_with_img_key(mocker, image_json, expected_response):
    request = MagicMock(spec=Request)
    request.json = image_json
    request.method = "POST"

    mocker.patch('controller.model.predict', return_value="detected")
    mocker.patch('controller.base64.b64decode', return_value="image")
    mocker.patch('controller.io.BytesIO', return_value="image")
    mocker.patch('controller.PIL.Image.open', return_value="image")

    response = await stream(request)
    assert json.loads(response.body) == expected_response


@pytest.mark.parametrize(
    "image_json, expected_response",
    [
        (
            {},
            {"uploaded": False, "Error": "Internal Error"},
        ),
    ],
)
@pytest.mark.asyncio
async def test_stream_with_request_without_img_key(mocker, image_json, expected_response):
    request = MagicMock(spec=Request)
    request.json = image_json
    request.method = "POST"

    mocker.patch('controller.model.predict', return_value="detected")
    mocker.patch('controller.base64.b64decode', return_value="image")
    mocker.patch('controller.io.BytesIO', return_value="image")
    mocker.patch('controller.PIL.Image.open', return_value="image")

    response = await stream(request)
    assert json.loads(response.body) == expected_response


@pytest.mark.parametrize(
    "image_json, expected_response",
    [
        (
            {"img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAB0sAAAdLAGxzXVqAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAALdQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASbLnewAAADx0Uk5TAAcICRwdHh8gKjg8PT4/QEFCQ1BgZmtsbW5vcHFygJ6foKGio6SlqMjKy8zNzs/d6Onq6+zw9/j6+/z9J+KC6QAAAcpJREFUeNrtmHlPwkAQR2s5BOTwAETwABSRQxG8KM73/1xGQ9ztYbvSnY4mv/cv2cxL3qRZ1nEAAACko1iUnd9YPR1Kzu96RF5PbLx7TV/c5ITyz2nLvCiTn76RWITP/IqoRag1NA6Y8ivCi/Cm//xiOf+MQtzvZyeg59cW4SgrAX9+xeY8E4FwfsUoxy8QlT96EXgEovNHLgKLwJlHCWwuGAXcIRlwm+MSKMzIiIcSj0B9RYY8H3MIJOcPLIJdAbP8vkWwKmCaX18EmwLm+bVFeLcn0PEoLWkE3AGRpEBhSqIC9SWJCljIn0bASv4UAnby7y5QW5KogK38OwrYy7+bQH5qdT69luTy63cEU049so66LCbn7xMLI8N3hPyEmAj9fcwo/+/eETjyx78j+NjrEzPxD0p8+RVxD0rVJWXAqvFj/jVlgtcVyq8YujL5FbOCTH5tEer++e01ZYzX0fNfkQADVya/YpLf5n8kIZZVmfyKddtxWncBFpwTF8FprfAHockp0DS4D0AAAhCAAAQgAAEI/HGB8UkCY2aBy6TjlxCAAAQgAAEIQAACEIAABCAAAQhAAAIQ+P8C5V4claTjldjjZQcAAECQDxNf2Xq5cqbTAAAAAElFTkSuQmCC"},
            {"uploaded": True, "result": "detected"},
        ),
    ],
)
@pytest.mark.asyncio
async def test_stream_request_with_correct_image_format(mocker, image_json, expected_response):
    request = MagicMock(spec=Request)
    request.json = image_json
    request.method = "POST"

    mocker.patch('controller.model.predict', return_value="detected")

    response = await stream(request)
    assert json.loads(response.body) == expected_response


@pytest.mark.parametrize(
    "image_json, expected_response",
    [
        (
            {"img": "data:image/png;base64,somethingWrongFormat"},
            {"uploaded": False, "Error": "Internal Error"},
        ),
    ],
)
@pytest.mark.asyncio
async def test_stream_request_with_wrong_image_format(mocker, image_json, expected_response):
    request = MagicMock(spec=Request)
    request.json = image_json
    request.method = "POST"

    mocker.patch('controller.model.predict', return_value="detected")
    
    response = await stream(request)
    assert json.loads(response.body) == expected_response


@pytest.mark.parametrize(
    "image_json, expected_response",
    [
        (
            {"img": "data:image/png;base64,anything"},
            {"uploaded": False, "Error": "No Face Detected"},
        ),
    ],
)
@pytest.mark.asyncio
async def test_stream_request_with_no_return_from_model(mocker, image_json, expected_response):
    request = MagicMock(spec=Request)
    request.json = image_json
    request.method = "POST"

    mocker.patch('controller.model.predict', return_value=None)
    mocker.patch('controller.base64.b64decode', return_value="image")
    mocker.patch('controller.io.BytesIO', return_value="image")
    mocker.patch('controller.PIL.Image.open', return_value="image")
    
    response = await stream(request)
    assert json.loads(response.body) == expected_response