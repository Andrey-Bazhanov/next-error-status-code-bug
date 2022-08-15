// some times Error from page serialized as string into `ctx.err?.message`
const parseError = (message) => {
  let parsed = '';
  try {
    parsed = JSON.parse(message ?? '');
  } catch (e) { }

  return typeof parsed === 'object' ? parsed.statusCode : parsed;
};

const ErrorPage = ({ statusCode }) => {
  return <div>{statusCode}</div>
};

ErrorPage.getInitialProps = async ctx => {
  const statusCode =
    parseError(ctx.err?.message) || ctx.err?.statusCode || ctx.res?.statusCode || 500;

  if (ctx.res) {
    ctx.res.statusCode = statusCode;
  }

  return { statusCode };
};

export default ErrorPage;
