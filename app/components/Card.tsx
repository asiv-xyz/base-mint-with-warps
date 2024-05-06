import { CARD_DIMENSIONS, TOKEN_IMAGE } from '../config';

export function Card({ message, image }: { message: string; image?: string }) {
  const imageSrc = image ?? TOKEN_IMAGE;
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        ...CARD_DIMENSIONS,
      }}
    >
      <link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' />
      <img style={{ width: '100%', height: '100%' }} src={imageSrc} />
      {message && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '100',
            width: '100%',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold'
          }}
        >
          <p style={{ fontFamily: 'Orbitron', margin: '0 auto', color: 'white' }}>{message}</p>
        </div>
      )}
    </div>
  );
}
