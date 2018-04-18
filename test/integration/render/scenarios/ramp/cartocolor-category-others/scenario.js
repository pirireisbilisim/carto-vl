const map = new carto.Map({
    container: 'map',
    background: 'black'
});

const source = new carto.source.GeoJSON(sources['points']);
const viz = new carto.Viz('color: ramp(buckets($cat, \'0\', \'1\'), PRISM), width: 50');
const layer = new carto.Layer('layer', source, viz);

layer.addTo(map);
