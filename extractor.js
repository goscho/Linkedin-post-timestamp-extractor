function getPostId(linkedinURL) {
  const regex = /([0-9]{19})/;
  const postId = regex.exec(linkedinURL).pop();
  return postId;
}

function extractUnixTimestamp(postId) {
  // BigInt needed as we need to treat postId as 64 bit decimal. This reduces browser support.
  const asBinary = BigInt(postId).toString(2);
  const first41Chars = asBinary.slice(0, 41);
  const timestamp = parseInt(first41Chars, 2);
  return timestamp;
}

function unixTimestampToHumanDate(timestamp) {
  const dateObject = new Date(timestamp);
  const humanDateFormat = dateObject.toUTCString() + " (UTC)";
  return humanDateFormat;
}

function getDate() {
  const linkedinURL = document.querySelector("#url").value;
  const unixTimestamp = extractUnixTimestampFromURL(linkedinURL);
  const humanDateFormat = unixTimestampToHumanDate(unixTimestamp);
  document.querySelector("#date").textContent = humanDateFormat;
}

function extractUnixTimestampFromURL(linkedinURL) {
  const postId = getPostId(linkedinURL);
  return extractUnixTimestamp(postId);
}

exports.extractUnixTimestampFromURL = extractUnixTimestampFromURL;
