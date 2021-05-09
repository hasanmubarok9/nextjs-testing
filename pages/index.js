import React from 'react';
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import SearchBox from '../src/SearchBox';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '16px',
    marginTop: '16px',
    marginBottom: '16px',
  }
}));

export default function Index() {
  const classes = useStyles();

  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState([])
  const [isError, setIsError] = React.useState(false)

  const handleSubmitSearch = e => {
    e.preventDefault();
    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.NEXT_PUBLIC_API_KEY}`)
    .then(async res => {
        const { ok } = await res;
        const result = await res.json();
        console.log("result ", result)
        setIsError(false)
        if(ok){
          setResults(result.response.docs)
        }
      })
      .catch(() => {
        setIsError(true)
    })
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search articles on New York Times here!
        </Typography>
        <SearchBox
          query={query}
          setQuery={setQuery}
          handleSubmitSearch={handleSubmitSearch}
        />
      </Box>
      <Box my={4}>
        {
          isError ? <Typography variant="h5">Oops, An Error Occured</Typography> :
          results.length > 0 && results.map((data, index) => (
              <Paper role="article" elevation={3} key={index} className={classes.paper}>
                <Typography variant="h6">{data.headline.main}</Typography>
                <Typography variant="subtitle1">{data.lead_paragraph}</Typography>
                <MuiLink href={data.web_url}>{data.web_url}</MuiLink>
              </Paper>
            )
          )
        }
      </Box>
    </Container>
  );
}
