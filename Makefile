
build:
	rimraf dist
	tsc

publish: build
	npm publish

publish-sync: publish
	cnpm sync mc-util