## TolQC Graphing for Sequencing data

The majority of this repo is the single page site i have been using
to develop the JS scripts which actually produce the graphs ("./js/pb_yield_time.js").

This script takes what is currently the contents of the TolQC site and parses the JS object to produce a key made up of:
item['specimen'] + item['well_label'] + item['run'] + item['group'] (This can be changed in the JS script)
to plot various data found in original object.

It should by visible by simply opening the html file in your browser of choice, however i'd suggest chrome.

This project has been developed in PyCharm.
