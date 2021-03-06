var myWorker;

function initWorker() {
  if(typeof(Worker) != 'undefined') {
    if(typeof(myWorker) === 'undefined') {
      myWorker = new Worker('web_worker.js');
      console.log('[Main]', 'Init Web Worker');
      myWorker.onmessage = function(event) {
        console.log('ben B gui lai');
        handleMessage(event);
      }
      myWorker.onerror = function(event) {
        console.log('[Main]', 'Error', event.message, event);
      }
    }
  } else {
    console.log("[Main]", "The browser doesn't support web worker");
  }
}

function handleMessage(event) {
  console.log(' handleMessage ben B gui lai');
  console.log('[Main]', 'Main Thread receives command: ', event.data.cmd, event.data.msg);
  if(event.data.cmd == 'stop') {
    console.log('[Main]', 'Web Worker is already stopped');
  }
}

function startWorker() {
  if(typeof(myWorker) != 'undefined') {
  console.log('Bat dau worker');    
    myWorker.postMessage({cmd : 'start', msg : 'hello'});
  } else {
    console.log('[Main]', 'Worker is undefined.');
  }
}

function stopWorker1() {
  if(typeof(myWorker) != 'undefined') {
    myWorker.terminate();
    myWorker = undefined;
    console.log('[Main]', 'Worker terminated.');  
  } else {
    console.log('[Main]', 'Worker is undefined.');
  }
}

function stopWorker2() {
  if(typeof(myWorker) != 'undefined') {
    myWorker.postMessage({cmd : 'stop', msg : 'bye'});
  } else {
    console.log('[Main]', 'Worker is undefined.');
  }
}
