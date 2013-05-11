TESTS = test/*.test.js
REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
			--reporter $(REPORTER) \
			--bail \
	  	$(TESTS)

.PHONY: test
