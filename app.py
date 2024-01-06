import os
from pathlib import Path
from flask import Flask, render_template, send_from_directory, redirect
from webpack_boilerplate.config import setup_jinja2_ext
from jinja2 import Environment, PackageLoader
from flask_socketio import SocketIO
import subprocess
import geopandas as gpd

BASE_DIR = Path(__file__).parent
app = Flask(__name__, static_folder="frontend/build", static_url_path="/static/")
app.config.update({
    'WEBPACK_LOADER': {
        'MANIFEST_FILE': BASE_DIR / "frontend/build/manifest.json",
    }
})
setup_jinja2_ext(app)
socketio = SocketIO(app)

incendios = gpd.read_file('effis/effis.shp')
incendios['sup'] = incendios.apply(lambda x: int(x.AREA_HA), axis=1)

@app.cli.command("webpack_init")
def webpack_init():
    from cookiecutter.main import cookiecutter
    import webpack_boilerplate
    pkg_path = os.path.dirname(webpack_boilerplate.__file__)
    cookiecutter(pkg_path, directory="frontend_template")


@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/pdf")
def pdf():
    return send_from_directory('render', 'render.pdf')

@socketio.on('crear')
def crear_pdf(data):
    env = Environment(
        loader=PackageLoader("app"),
        block_start_string='<BLOCK>',
        block_end_string='</BLOCK>',
        variable_start_string='<VAR>',
        variable_end_string='</VAR>',
    )
    template = env.get_template('pdf.tex')
    os.chdir(BASE_DIR)
    print(incendios.keys())

    os.chdir(os.path.join(BASE_DIR, 'render'))
    with open('render.tex', 'w') as f:
        f.write(template.render({
            'incendios': incendios,
            'data': data
            }))
    subprocess.run(['xelatex', 'render.tex'])
    subprocess.run(['xelatex', 'render.tex'])
    os.chdir(BASE_DIR)
    socketio.emit('open_pdf')

if __name__ == '__main__':
    socketio.run(app)
