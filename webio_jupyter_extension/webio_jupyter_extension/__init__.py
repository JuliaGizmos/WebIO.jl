
import json
from pathlib import Path

from ._version import __version__

HERE = Path(__file__).parent.resolve()

with (HERE / "labextension" / "package.json").open() as fid:
    data = json.load(fid)


def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": data["name"]
    }]


def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'nbextension',
        'dest': 'webio-jupyter-nbextension',
        'require': 'webio-jupyter-nbextension/nbextension'
    }]


def _jupyter_server_extension_paths():
    return [{
        "module": "webio_jupyter_serverextension",
    }]
