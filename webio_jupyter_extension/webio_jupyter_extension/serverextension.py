from notebook.utils import url_path_join
from notebook.base.handlers import IPythonHandler
from tornado.web import StaticFileHandler, HTTPError
from tornado import gen

import os
import json

class JuliaPackageAssetServer(IPythonHandler, StaticFileHandler):
    def initialize(self, *args):
        self.root = ""
        IPythonHandler.initialize(self, *args)
        StaticFileHandler.initialize(self, "", *args)

    def set_extra_headers(self, path):
        # Disable cache
        self.set_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')

    @gen.coroutine
    def get(self, pkg, fpath):
        homedir = os.path.expanduser("~")
        data = {}
        registry = os.path.join(homedir, ".jlassetregistry.json")
        if not os.path.isfile(registry):
            raise HTTPError(404)
        with open(registry, "r") as assets_file:
            data = json.load(assets_file)
        parts = fpath.split("/", 1)
        if len(parts) > 1:
            sha = parts[0]
        else:
            sha = fpath
        key = "/assetserver/" + sha
        if key in data:
            f = data[key][0]
            if len(parts) > 1:
                self.root = f
                f = os.path.join(f, parts[1])
            else:
                self.root = os.path.dirname(f)
            yield StaticFileHandler.get(self, f)
        else:
            raise HTTPError(404)


def load_jupyter_server_extension(nb_server_app):
    """
    Extension to serve files from Pkg/assets/
    """
    web_app = nb_server_app.web_app
    host_pattern = '.*$'
    route_pattern = url_path_join(web_app.settings['base_url'], '/(assetserver)/(.*)$')
    web_app.add_handlers(
            host_pattern, [(route_pattern, JuliaPackageAssetServer)])
