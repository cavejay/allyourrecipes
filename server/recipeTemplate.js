const stripIndent = require("common-tags/lib/stripIndent");

const template = stripIndent`
  # Recipe Name

  ## Description
  My great-great-grandma's sister's best friend found this on her niece's facebook page. It's really great!

  ## Ingredients
  - Fluff
  - Tears
  -

  ## Method
  1. Mix all
  2. Cook under hairdryer for 15 minutes
  3. consume
  4.
`;

module.exports = `<p>${template.split("\n").join("</p><p>")}</p>`;
