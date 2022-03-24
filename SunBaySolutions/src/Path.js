
const app_name = 'https://hospitalityplatform.herokuapp.com/'
exports.buildPath =
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production')
    {
        return app_name + route;
    }
    else
    {
        return 'http://localhost:5000/' + route;
    }
}

