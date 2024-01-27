import CancelIcon from '@mui/icons-material/Cancel';

interface ErrorHandlerProps {
  errorMsg: string;
  style?: React.CSSProperties;
}

export default function ErrorHandler({ errorMsg, style }: ErrorHandlerProps) {
  return (
    <div
      style={{
        ...style,
        borderRadius: '20px',
        backgroundColor: 'rgb(255,105,97, 0.5)',
        padding: '5px',
        display: 'flex',
      }}
    >
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          width: '25px',
        }}
      >
        <CancelIcon fontSize='small' />
      </div>

      <div
        style={{
          color: 'rgba(0,0,0,0.7)',
          display: 'flex',
          fontWeight: 'bold',
          fontSize: '2vh',
        }}
      >
        {errorMsg}
      </div>
    </div>
  );
}
