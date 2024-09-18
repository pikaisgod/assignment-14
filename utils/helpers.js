module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
    format_plural: (word, amount) => {
      // Pluralize words based on the amount
      if (amount !== 1) {
        return `${word}s`;
      }
      return word;
    },
    format_url: (url) => {
      // Simplify URLs
      return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0];
    },
  };
  