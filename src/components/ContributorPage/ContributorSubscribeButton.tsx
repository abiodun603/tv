import React from 'react';

export const ContributorSubscribeButton = ({ contributor, isCurrentUser }) => {
  if (isCurrentUser) {
    return null;
  }

  return (
    <button
      className="btn btn-primary btn-block btn-lg"
      type="button"
      onClick={() => {
        contributor.toggleSubscribe();
      }}
    >
      {contributor.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
};
