TESTS = test/*.test.js
REPORTER = dot

test: node_modules
	@NODE_ENV=test ./node_modules/mocha/bin/_mocha \
		--reporter $(REPORTER) \
		--timeout 3s \
		--bail \
		$(TESTS)

node_modules: package.json
	@npm install

.PHONY: test
