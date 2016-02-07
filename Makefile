# set up tools
# if you want to use babel-client you first have to start babel-server
# BABEL = ./node_modules/.bin/babel
BABEL = node babel-client.js

# gather output file names
JS = $(patsubst src/%.js, build/%.js, $(shell find src -name '*.js'))

all: $(JS)

build/%.js: src/%.js
	@mkdir -p $(dir $@)
	echo "babel $< -> $@"
	@$(BABEL) $< > $@

clean:
	rm -rf build

.PHONY: all clean
