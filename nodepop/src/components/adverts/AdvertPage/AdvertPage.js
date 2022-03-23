import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Page from '../../layout/Page';
import { getAdvert } from '../service';

class AdvertPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: null,
      error: null,
      isLoading: false,
    };
  }

  handleGetAdvert = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const advert = await getAdvert(this.props.advertId);
      this.setState({ advert, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false, error });
    }
  };

  componentDidMount() {
    this.handleGetAdvert();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('old', prevProps, prevState);
    console.log('new', this.props, this.state);
    if (prevProps.advertId !== this.props.advertId) {
      this.handleGetAdvert();
    }
  }

  componentWillUnmount() {
    console.log('unmont');
    // clean tasks
  }

  render() {
    const { advert, error, isLoading } = this.state;

    // isLoading - show an spinner
    // error - show an alert
    if (error?.status === 401) {
      return <Navigate to="/login" />;
    }

    if (error?.status === 404) {
      return <Navigate to="/404" />;
    }

    return (
      <Page title="Advert detail">
        <div>{advert ? JSON.stringify(advert) : 'Nothing to show'}</div>
      </Page>
    );
  }
}

// const TweetPageFunction = () => {
//   const [tweet, setTweet] = useState(null);
//   const { tweetId } = useParams();
//   // return <TweetPage tweetId={tweetId} />;

//   useEffect(() => {
//     getTweet(tweetId).then(tweet => setTweet(tweet));

//     return () => {
//       // tweet 1
//       console.log('unmounted');
//     };
//   }, [tweetId]);

//   return (
//     <Page title="Tweet detail">
//       <div>{tweet ? JSON.stringify(tweet) : 'Nothing to show'}</div>
//     </Page>
//   );
// };

const AdvertPageFunction = () => {
  const ref = useRef(null);
  const { advertId } = useParams();

  useEffect(() => {
    console.log('ref', ref.current);
  }, []);

  return <AdvertPage ref={ref} advertId={advertId} />;
};

export default AdvertPageFunction;
