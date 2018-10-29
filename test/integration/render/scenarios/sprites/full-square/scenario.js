const map = new CartoMap({
    container: 'map',
    background: 'white'
});

const source = new carto.source.GeoJSON(sources['point']);
const viz = new carto.Viz(`
width: 50
symbol: image('/test/common/test.png')
symbolPlacement: align_bottom
`);
const layer = new carto.Layer('layer', source, viz);

layer.addTo(map);
layer.on('loaded', () => {
    window.loaded = true;
});