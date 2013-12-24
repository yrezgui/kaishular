# [Kaishular](http://www.github.com/yrezgui/kaishular)

An opinionated kickstarter for [AngularJS](http://angularjs.org) projects.

***

## Quick Start

Install Node.js and then:

```sh
$ git clone git://github.com/yrezgui/kaishular
$ cd kaishular
$ sudo npm -g install grunt-cli bower
$ npm install
$ bower install
$ grunt watch
```

Finally, open `file:///path/to/kaishular/build/index.html` in your browser.

Happy hacking!

## Purpose

`kaishular` is based on [`ng-boilerplate`](http://github.com/ngbp/ng-boilerplate) project.
I just found that there was tasks that I don't like and I wanted to personnalize it.

So I remove all the CoffeeScript tasks (Viva Vanilla JavaScript !!) and I remove temporarly the 
karma tasks because I still don't understand all the architecture of this project. I use it at 
my work but without Grunt tasks so I still need to improve myself to make it completely automatic.

I remove the html2js templates because I think in a big AngularJS application, it doesn't worth it
to cache all the templates in a single file. It will cost you too much loading time and each time 
you change a really small part of any template page, the browser will reload all the file (bad 
cache practise).

Maybe prefetching a group of related pages will be the solution : http://blog.mgechev.com/2013/10/01/angularjs-partials-lazy-prefetching-strategy-weighted-directed-graph/

I will try to update `kaishular` as oftenly as I can while following the changes of 
[`ng-boilerplate`](http://github.com/ngbp/ng-boilerplate), which is still the base of this project.

### To Do

See the [issues list](http://github.com/yrezgui/kaishular/issues). And
feel free to submit your own!

### Contributing

This is an opinionated kickstarter, but the opinions are fluid and
evidence-based. Don't like the way I did something? Think you know of a better
way? Have an idea to make this more useful? Let me know! You can contact me
through all the usual channels or you can open an issue on the GitHub page. If
you're feeling ambitious, you can even submit a pull request - how thoughtful
of you!

So join the team! I'm a nice guy.

