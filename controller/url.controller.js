import URL from "../model/urlSchema.js";
import generateShortUrl from "../config/urlShort.js";
// import authenticateToken from "../authentication/user.auth.js";
export const protectedUrlShortner = async (req, res) => {
    try {
      const { original_url,  } = req.body;
  
      if (!original_url) {
        return res.status(400).json({ error: 'Missing original_url parameter' });
      }
  
      // Check if the URL already exists in the database
      const existingUrl = await URL.findOne({ original_url });
  
      if (existingUrl) {
        return res.json({ original_url, short_url: existingUrl.short_url });
      }
  
      // Generate a unique short URL
      const short_url = generateShortUrl();
  
      // Save the new URL to the database
      const newUrl = new URL({ original_url, short_url });
      await newUrl.save();
  
      res.json({ original_url, short_url, });
    } catch (error) {
      console.error('Error shortening URL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Route to redirect to the original URL using the short URL
  export const shortUrl = async (req, res) => {
    try {
      const { short_url } = req.params;
      const url = await URL.findOne({ short_url });
  
      if (url.short_url) {
        console.log(url.short_url);
        res.redirect(url.original_url);
      } else {
        res.status(404).json({ error: 'Short URL not found' });
      }
    } catch (error) {
      console.error('Error redirecting:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  