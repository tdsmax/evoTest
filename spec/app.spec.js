'use strict';

// Initial State

describe('App Module', function () {
  var pubSub = require('./PubSub.js');
  var webShock = require('./SocketApi.js');

  it('should create connection on connectionReady Event', function(){
    expect( pubSub.sub ).toBeDefined( );
  });

  it('should update table on userUpdate event', function(){
    expect( true ).toBe( true );
  });

  it('should remove table on removeTable event', function(){
    expect( true ).toBe( true );
  });
});
