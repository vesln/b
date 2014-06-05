TESTS = test/*.test.js
REPORTER = dot

test: node_modules
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout 3s \
		--bail \
		$(TESTS)

node_modules: package.json
	@npm install && touch $@

examples: node_modules
	@node --harmony examples/index.js

.PHONY: test examples
