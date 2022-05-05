import { Component } from 'react';
import axios from 'axios';
import { Movie } from '../../@types/movie';
import AutoCompleteInputField from '../molecules/AutoCompleteInputField';

type GuessMovieState = {
  movies: Movie[],
}

class GuessMovie extends Component<{}, GuessMovieState> {
  constructor(props: {}) {
    super(props);
    // Don't call this.setState() here!
    this.state = { movies: new Array<Movie>() };
  }
  
  componentDidMount () {
    axios('https://projects.sebbejohansson.com/automatedwatchlist/traktmoviesdump.json')
    .then(response => {
      let movies = response.data.map((movie: any): Movie => {
        return {
          id: movie.movie.ids.trakt,
          title: movie.movie.title,
          releasedAt: movie.movie.released,
          genre1: movie.movie.genres?.[0],
          genre2: movie.movie.genres?.[1],
          runtime: movie.movie.runtime,
          traktRating: movie.movie.rating,
        } as Movie;
      }) as Movie[];
      console.log(movies);
      this.setState({
        movies: movies,
      });
    })
    .catch(error => {
      console.log('Error getting fake data: ' + error);
    })
  }

  render() {
    return (
      <div>
        <AutoCompleteInputField options={this.state.movies} />
      </div>
    );
  }
}

export default GuessMovie;