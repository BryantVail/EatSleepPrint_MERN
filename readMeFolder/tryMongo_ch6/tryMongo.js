'use strict';
const MongoClient = require('mongodb');

function usage(){
    console.log("Usage:");
    console.log('node', _filename, '<option>');
    console.log('Where option is one of:');
    console.log('   callbacks   Use the Callbacks paradigm');
    console.log('   promises    Use the Promises paradigm');
    console.log('   generator   Use the Generator paradigm');
    console.log('   async       Use the async module');
}

if(process.argv.length <3){
    console.log("Incorrect Number of arguments");
    usage();
}
else{
    if(process.argv[2] === 'callbacks') {
        testWithCallbacks();
    }
    else if(process.argv[2] === 'promises'){
        testWithPromises();
    }
    else if(process.argv[2] === 'generator'){
        testWithGenerator();
    }
    else if(process.argv[2] === 'async'){
        testWithAsync();
    }
    else{
        console.log('Invalid option:', process.argv[2]);
        usage();
    }



}//end module