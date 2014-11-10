/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
var User = require('../api/User');
User.getUserByName('shanelau1021').then(function(data){
    console.log(data);
});
