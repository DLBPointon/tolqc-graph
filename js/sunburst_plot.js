function species_sunburst() {

  var sb_plot = document.getElementById('species_sunburst_plot');

  const master_dict_2 = {
    'a': 'Amphibia',
    'b': 'Bird',
    'c': 'Non-vascular plants',
    'C': 'Insects', // To Account for Durbin Project Code
    'd': 'Dicotyledons',
    'e': 'Echinoderms',
    'f': 'Fish',
    'g': 'Fungi',
    'h': 'Platyhelminth',
    'i': 'Insects',
    'j': 'Jellyfish and Cnidaria',
    'k': 'Other Chordates',
    'l': 'Monocotyledon',
    'm': 'Mammal',
    'n': 'Nematodes',
    'o': 'Sponges',
    'p': 'Protists',
    'q': 'Other Arthropods',
    'r': 'Reptile',
    's': 'Shark',
    't': 'Other Animal Phyla',
    'u': 'Algae',
    'v': 'Other Vascular Plants',
    'w': 'Annelids',
    'x': 'Molluscs',
    'y': 'Bacteria',
    'z': 'Archae'
    }

  // Issue with sl - dl data gap
  var dl_prefix_dict = {
    'a': 'Amphibian',
    'b': 'Aves',
    'c': 'Non-vascular plant - NC',
    'd': 'Dicotyledons - NC',
    'e': 'Echinoderms - NC',
    'f': 'Fish - NC',
    'g': 'Fungi - NC',
    'h': 'Platyhelminth - NC',
    'i': 'Insects - NC',
    'j': 'Jellyfish and Cnidaria - NC',
    'k': 'Other Chordates - NC',
    'l': 'Monocotyledon - NC',
    'm': 'Mammal - NC',
    'n': 'Nematodes - NC',
    'o': 'Sponges - NC',
    'p': 'Protists - NC',
    'q': 'Other Arthropods - NC',
    'r': 'Reptile - NC',
    's':'Shark - NC',
    't': 'Other Animal Phyla - NC',
    'u': 'Algae - NC',
    'v': 'Other Vascular Plants - NC',
    'w': 'Annelids - NC',
    'x': 'Molluscs - NC',
    'y': 'Bacteria - NC',
    'z': 'Archae - NC',
    'ca': 'Andreaeopsida', 'cb': 'Bryopsida', 'ch': 'Haplomitriopsida', 'cj': 'Jungermanniopsida',
    'cm': 'Marchantiopsida', 'cn': 'Anthocerotopsida', 'cs': 'Sphagnopsida', 'da': 'Solanales',
    'dc': 'Caryophyllales', 'dd': 'Malvales', 'dh': 'Fagales', 'dm': 'Ranunculales', 'dr': 'Zygophyllales',
    'ea': 'Asteroidea', 'ec': 'Crinoidea', 'ee': 'Echinoidea', 'eh': 'Holothuroidea',
    'eo': 'Ophiuroidea',
    'f': 'Actinopterygii',
    'ga': 'unspecified_class_Ascomycota',
    'gb': 'unspecified_class_Basidiomycota', 'gc': 'Neocallimastigomycetes', 'gd': 'Dothideomycetes',
    'gf': 'Tremellomycetes', 'gg': 'Glomeromycetes', 'gk': 'Tritirachiomycetes', 'gl': 'Lichinomycetes',
    'gm': 'Microsporea', 'go': 'unspecified_class_Oomycota', 'gp': 'Pezizomycetes',
    'gr': 'Sordariomycetes', 'gs': 'Saccharomycetes', 'gt': 'Taphrinomycetes', 'gu': 'Ustilaginomycetes',
    'gx': 'unspecified_phylum_Fungi', 'gy': 'Leotiomycetes', 'gz': 'unspecified_class_Zygomycota',
    'hc': 'Catenulida', 'he': 'Cestoda', 'hm': 'Monogenea', 'hr': 'Rhabditophora', 'ht': 'Trematoda',
    'ia': 'Archaeognatha', 'ib': 'Blattodea', 'ic': 'Coleoptera', 'id': 'Diptera', 'ie': 'Ephemeroptera',
    'if': 'Phasmida', 'ig': 'Dermaptera', 'ih': 'Hemiptera', 'ii': 'Trichoptera', 'ij': 'Mecoptera',
    'ik': 'Megaloptera', 'il': 'Lepidoptera', 'im': 'Mantodea', 'in': 'Neuroptera', 'io': 'Odonata',
    'ip': 'Plecoptera', 'iq': 'Orthoptera', 'ir': 'Raphidioptera', 'is': 'Siphonaptera', 'it': 'Thysanoptera',
    'iu': 'Psocodea', 'iv': 'Strepsiptera', 'iy': 'Hymenoptera', 'iz': 'Zygentoma', 'ja': 'Anthozoa',
    'jh': 'Hydrozoa', 'jn': 'Nuda', 'jr': 'Staurozoa', 'js': 'Scyphozoa', 'jt': 'Tentaculata', 'ka': 'Ascidiacea',
    'kc': 'Cephalaspidomorphi', 'kd': 'Appendicularia', 'ke': 'Enteropneusta', 'kl': 'Leptocardii',
    'km': 'Myxini', 'kp': 'Pterobranchia', 'kt': 'Thaliacea', 'la': 'Alismatales', 'lc': 'Commelinales',
    'ld': 'Dioscoreales', 'll': 'Liliales', 'lp': 'Poales', 'lr': 'Arecales', 'ls': 'Asparagales',
    'lz': 'Zingiberales',
    'm': 'Mammalia',
    'na': 'Aphelenchida', 'nd': 'Desmodorida', 'ne': 'Enoplida',
    'nf': 'unspecified_order_Adenophorea', 'ng': 'Strongylida', 'nh': 'Monhysterida', 'ni': 'Araeolaimida',
    'nl': 'Dorylaimida', 'nm': 'Mermithida', 'nn': 'Mononchida', 'no': 'Desmoscolecida', 'np': 'Diplogasterida',
    'nr': 'Rhabditida', 'ns': 'Spirurida', 'nt': 'Trichocephalida', 'nu': 'unspecified_class_Nematoda',
    'nw': 'Triplonchida', 'ny': 'Tylenchida', 'oc': 'Calcarea', 'od': 'Demospongiae', 'oh': 'Hexactinellida',
    'oo': 'Homoscleromorpha', 'pa': 'Amoebozoa', 'pb': 'Bigyra', 'pc': 'Cercozoa', 'pe': 'Euglenozoa',
    'pf': 'Foraminifera', 'ph': 'Phoronida', 'pi': 'Ciliophora', 'pk': 'Choanozoa', 'pm': 'Mycetozoa',
    'pp': 'Percolozoa', 'pr': 'Rotifera', 'ps': 'Sarcomastigophora', 'pu': 'unspecified_phylum_Protozoa',
    'px': 'Apicomplexa', 'py': 'Myzozoa', 'qb': 'Branchiopoda', 'qc': 'Chilopoda', 'qd': 'Diplopoda',
    'qe': 'Entognatha', 'qh': 'Hexanauplia', 'qm': 'Malacostraca', 'qo': 'Ostracoda', 'qp': 'Pauropoda',
    'qq': 'Arachnida', 'qs': 'Symphyla', 'qu': 'unspecified_class_Arthropoda', 'qx': 'Maxillopoda', 'qy': 'Pycnogonida',
    'r': 'Reptilia',
    'se': 'Elasmobranchii', 'sh': 'Holocephali',
    'ta': 'Acanthocephala', 'tb': 'Brachiopoda', 'tc': 'Cephalorhyncha', 'td': 'Dicyemida',
    'te': 'Entoprocta', 'tf': 'Nematomorpha',
    'tg': 'Gastrotricha', 'th': 'Chaetognatha', 'tm': 'Gnathostomulida', 'tn': 'Nemertea',
    'to': 'Orthonectida', 'ts': 'Sipuncula', 'tt': 'Tardigrada', 'tu': 'unspecified_phylum_Animalia',
    'tx': 'Xenacoelomorpha', 'ty': 'Cycliophora', 'tz': 'Bryozoa', 'uc': 'Chlorophyta', 'ug': 'Glaucophyta',
    'uh': 'Haptophyta', 'uk': 'Charophyta', 'uo': 'Ochrophyta', 'ur': 'Rhodophyta', 'uy': 'Cryptophyta',
    've': 'Equisetopsida', 'vg': 'Ginkgoopsida', 'vl': 'Lycopodiopsida', 'vo': 'Polypodiopsida',
    'vp': 'Pinopsida', 'vs': 'Psilotopsida', 'wa': 'Amphinomida', 'wb': 'Branchiobdellida', 'wc': 'Crassiclitellata',
    'wd': 'Spionida', 'we': 'Echiuroidea', 'wh': 'Haplotaxida', 'wj': 'Eunicida',
    'wk': 'Arhynchobdellida', 'wl': 'Lumbriculida', 'wn': 'Enchytraeida', 'wo': 'Opisthopora', 'wp': 'Phyllodocida',
    'wr': 'Rhynchobdellida', 'ws': 'Sabellida', 'wt': 'Terebellida', 'wu': 'unspecified_order_Polychaeta', 'wx': 'UNCLASSIFIED ANNELID',
    'xa': 'Caudofoveata', 'xb': 'Bivalvia', 'xc': 'Cephalopoda', 'xg': 'Gastropoda', 'xm': 'Monoplacophora',
    'xo': 'Solenogastres', 'xp': 'Polyplacophora', 'xs': 'Scaphopoda', 'ya': 'Actinobacteria',
    'yc': 'Cyanobacteria', 'yp': 'Proteobacteria',
    'z': 'Archaea',
    'C': 'Insects - NC', // Durbin Non-Standard
  }

  // Further Durbin Projects include 'mm15'

  var label_data = ["Eukaryota", //"Prokaryota",
                    "Amphibia", "Bird", "Non-vascular plants", "Insects", "Dicotyledons", "Echinoderms",
                    "Fish", "Fungi", "Platyhelminth", "Jellyfish and Cnidaria", "Other Chordates",
                    "Monocotyledon", "Mammal", "Nematodes", "Sponges", "Protists", "Other Arthropods",
                    "Reptile", "Shark", "Other Animal Phyla", "Algae", "Other Vascular Plants", "Annelids",
                    "Molluscs", //"Bacteria", "Archae"
                  ]

  var parent_data = ["", //"",
                    "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota",
                    "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota",
                    "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota",
                    "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota", "Eukaryota",
                    "Eukaryota", //"Prokaryota", "Prokaryota"
                  ]

  $.getJSON("data.json", function(data) {
    var solo_list = []
    var dl_solo_list = []
    var species_list = []

  // Adds Parent as Eukayotes and Label as Insecta
    data.forEach((item) => {
      //console.log(item["specimen"].match('[a-z]*')[0])
      if (!dl_solo_list.includes(dl_prefix_dict[item["specimen"].match('([a-z]*[0-9]*)')[0]])) {
      dl_solo_list.push(dl_prefix_dict[item["specimen"].match('([a-z]*[0-9]*)')[0]])
      label_data.push(dl_prefix_dict[item["specimen"].match('([a-z]*[0-9]*)')[0]])
      parent_data.push(master_dict_2[item["specimen"].split("")[0]])
      }
    })

    // Adds Parent as Insecta and Label as Species
    data.forEach((item) => {
      if (!solo_list.includes(item["species"].split(" ")[0] + " sp.")) {
        // The Durbin Function
        if (item['specimen'].slice(0,2) === 'mm' || item['specimen'].slice(0,2) === 'CA') {
          solo_list.push(item["species"].split(" ")[0] + " sp.")
          label_data.push(item["species"].split(" ")[0] + " sp.")
          parent_data.push('Lepidoptera')
          console.log(item["species"].split(" ")[0] + " sp.")
        } else {
        solo_list.push(item["species"].split(" ")[0] + " sp.")
        parent_data.push(dl_prefix_dict[item["specimen"].match('([a-z]*[0-9]*)')[0]])
        label_data.push(item["species"].split(" ")[0] + " sp.")
        }
      }
    })

    // Adds Parent as Species and Label as full species
    data.forEach((item) => {
      var species_ind = []
      let species_note = dl_prefix_dict[item["specimen"].match('([a-z]*[0-9]*)')[0]]
      if (!species_list.includes(item["species"].split("")[0] + " sp.")) {
        if (!species_ind.includes(item["species"])) {
          species_list.push(item["species"])
          species_ind.push(item["species"])
          parent_data.push(item["species"].split(" ")[0] + ' sp.')
          label_data.push(item["species"])
        } else {
        console.log("MISSING TAXONOMY DATA - " + species_note + " - " + item["species"])
        }
      }
    })

  var datas = [{
      maxdepth: 2,
      "type": "sunburst",
      "labels": label_data,
      "parents": parent_data,
      "leaf": {"opacity": 0.4},
      "branchvalues": 'total',
      textposition: 'inside',
      insidetextorientation: 'radial'
  }];

  var layout = {
    margin: {l: 0, r: 0, b: 0, t:0},
    sunburstcolorway:[
      "#636efa","#EF553B","#00cc96","#ab63fa","#19d3f3",
      "#e763fa", "#FECB52","#FFA15A","#FF6692","#B6E880"
    ],
    extendsunburstcolorway: true
  };

  var config = {responsive: true}
  Plotly.newPlot(sb_plot, datas, layout, config)
}
)}
