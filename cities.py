# "cities15000.tsv" file is downloaded from http://download.geonames.org/export/dump/

import csv

cities = []

with open("cities15000.tsv") as tsvfile, open("allcities.js", "w") as output:
    # readableTSV = csv.reader(tsvfile, delimiter="\t")
    # output.write("document.addEventListener(\"DOMContentLoaded\", function() {\n")
    output.write("var cities = [\n")
    for row in tsvfile:
        data = row.strip().split("\t")
        city = data[1]
        output.write("\t\"" + city + "\",\n")
    output.write("]\n")
    # output.write("});")
        
# with open("allcities.js", "w") as output:
#     output.write("document.addEventListener(\"DOMContentLoaded\", function() {\n")
#     output.write("\tvar cities = [")
#     for city in cities:
        
#     output.write(str(cities) + "\n")
#     output.write("});")
