import notify from 'gulp-notify';
import argv from 'yargs';

export default function(error) {

  if (!argv.production) () => {
    const args = Array.prototype.slice.call(arguments);
    // Send error to notification center with gulp-notify
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);
    // Keep gulp from hanging on this task
    this.emit('end');
  };

  if(argv.production) () => {
    // Log the error and stop the process
    console.log(error);
    process.exit(1);
  };

}
