import { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Movie } from '../../@types/movie';

type AutoCompleteInputFieldProps = {
  options: Movie[];
}

type AutoCompleteInputFieldState = {
  value: string,
  suggestions: Movie[],
}

const getSuggestions = (value: string, options: Movie[]) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : options.filter(option =>
    option.title.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = (suggestion: Movie) => suggestion.title;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: Movie) => (
  <div>
    {suggestion.title}
  </div>
);

class AutoCompleteInputField extends Component<AutoCompleteInputFieldProps, AutoCompleteInputFieldState> {
  constructor(props: AutoCompleteInputFieldProps) {
    super(props);

    this.state = {
      value: '',
      suggestions: new Array<Movie>()
    };
  }

  onChange = (event: any, {newValue} : {newValue: string}) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({value} : {value:string}) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.options)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  
  render() {
    const { options } = this.props;
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default AutoCompleteInputField;
