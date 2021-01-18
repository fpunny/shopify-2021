const { REACT_APP_OMDB_URL, REACT_APP_OMDB_KEY } = process.env;

export default async function searchOMDb(params, controller) {
  // Validate params
  if (process.env.NODE_ENV !== 'production') {
    if (params.i && params.t) {
      throw new Error(
        `Shouldn't search by id and title at the same time (redudant)`,
      );
    }

    if ((params.i || params.t) && params.s) {
      throw new Error(`Invalid combination of params`);
    }
  }

  // Generate "payload" in the form of search params
  const urlParams = new URLSearchParams({ apiKey: REACT_APP_OMDB_KEY });
  Object.entries(params).forEach(([name, value]) =>
    urlParams.append(name, value),
  );

  // Make request
  const results = await fetch(`${REACT_APP_OMDB_URL}?${urlParams.toString()}`, {
    signal: controller?.signal,
  }).then((_) => _.json());

  // For changing / handling error message
  if (results.Response === 'False') {
    switch (results.Error) {
      case `Movie not found!`:
        results.Error = `No movies found! Perhaps try another movie instead :c`;
        break;
      case `Too many results.`:
        results.Error = `Too many results. Please be more specific.`;
        break;
      default:
        break;
    }
    throw new Error(results.Error);
  }

  return results;
}
