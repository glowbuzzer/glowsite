# Glowsite Plugins

Plugins are a mixture of:

- vite plugins
- remark plugins, used to enhance our markdown pages
- data plugins (see below)

See comments in individual plugins for their purpose.

## Data plugins

The pre-render script needs to know about all routes (slugs). It discovers this data doing an import of `data/index`.

Each export from the data directory should be an array of {slug: string} objects. It can include any other info, for example the gbc schema
data source includes rich schema information, but this is ignored by the pre-render script.

See individual scripts in `data` directory for more info.
