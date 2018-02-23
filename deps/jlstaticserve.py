from notebook.utils import url_path_join
from notebook.base.handlers import IPythonHandler
from tornado.web import StaticFileHandler, HTTPError

import os
import json

class JuliaPackageAssetServer(IPythonHandler, StaticFileHandler):
    def initialize(self, *args):
        self.root = ""
        IPythonHandler.initialize(self, *args)
        StaticFileHandler.initialize(self, "", *args)

    def get(self, pkg, fpath):
        dirs = self.julia_load_path
        for d in dirs:
            dirpath = os.path.join(d, pkg, "assets")
            fullpath = os.path.join(dirpath, fpath)
            if os.path.isdir(dirpath) and os.path.isfile(fullpath):
                self.root = dirpath
                StaticFileHandler.get(self, fpath)
                return
        raise HTTPError(404)

def load_jupyter_server_extension(nb_server_app):
    """
    Extension to serve files from Pkg/assets/
    """
    web_app = nb_server_app.web_app
    host_pattern = '.*$'
    route_pattern = url_path_join(web_app.settings['base_url'], '/pkg/([^/]+)/(.*)$')
    with open(os.path.join(os.path.dirname(__file__), "load_paths.json"), "r") as paths_file:
        JuliaPackageAssetServer.julia_load_path = json.load(paths_file)
    print("Will serve asset files from any Julia package under", JuliaPackageAssetServer.julia_load_path)
    web_app.add_handlers(
            host_pattern, [(route_pattern, JuliaPackageAssetServer)])
