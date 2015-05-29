var context = require.context('.', true, /.+\.spec\.jsx?$/);
context.keys().forEach(context);
export default context;
