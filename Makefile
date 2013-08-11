TESTS = test/*.test.js
REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/mocha/bin/_mocha \
		--reporter $(REPORTER) \
		--timeout 3s \
		--bail \
		$(TESTS)

.PHONY: test
