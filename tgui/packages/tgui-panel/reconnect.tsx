import { useDispatch } from 'tgui/backend';
import { Button } from 'tgui-core/components';

import { dismissWarning } from './game/actions';

let url: string | null = null;

setInterval(() => {
  Byond.winget('', 'url').then((currentUrl) => {
    // Sometimes, for whatever reason, BYOND will give an IP with a :0 port.
    if (currentUrl && !currentUrl.match(/:0$/)) {
      url = currentUrl;
    }
  });
}, 5000);

export const ReconnectButton = (props) => {
  if (!url) {
    return null;
  }
  const dispatch = useDispatch();
  return (
    <>
      <Button
        color="white"
        onClick={() => {
          Byond.command('.reconnect');
        }}
      >
        Reconnect
      </Button>
      <Button
        color="white"
        icon="power-off"
        tooltip="Relaunch game"
        tooltipPosition="bottom-end"
        onClick={() => {
          location.href = `byond://${url}`;
          Byond.command('.quit');
        }}
      />
      <Button
        color="white"
        onClick={() => {
          dispatch(dismissWarning());
        }}
      >
        Dismiss
      </Button>
    </>
  );
};
