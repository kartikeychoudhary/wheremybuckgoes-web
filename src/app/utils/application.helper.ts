export const formatDate = (millis) => {
  if (millis === null || millis === undefined || millis === 0) {
    return 'No Data';
  }
  const date = new Date(millis);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatExecutionTime = (millis) => {
  // Ensure millis is a positive number (handle negative values if needed)
  const time = Math.abs(millis);

  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

interface GenerateInitialsAvatarOptions {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontStyle?: string;
  shape?: string;
}

export const generateInitialsAvatar = (
  name: string,
  options?: GenerateInitialsAvatarOptions
) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const defaultOptions = {
    backgroundColor: getRandomColor(),
    textColor: '#fff',
    fontSize: '50%',
    fontStyle: 'bold',
    shape: 'circle',
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Set canvas size (adjust as needed)
  canvas.width = 100;
  canvas.height = 100;

  // Draw background based on shape
  if (finalOptions.shape === 'circle') {
    context.beginPath();
    context.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      0,
      2 * Math.PI
    );
    context.fillStyle = finalOptions.backgroundColor;
    context.fill();
  } else {
    // Handle other shapes (square, etc.) by modifying path and fill methods
  }

  // Extract and format initials
  const initials = extractInitials(name).toUpperCase();

  // Set text styles
  context.font = `${finalOptions.fontSize} Arial`;
  context.fillStyle = finalOptions.textColor;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  // Calculate text position
  const textX = canvas.width / 2;
  const textY = canvas.height / 2;

  // Draw initials on canvas
  context.fillText(initials, textX, textY);

  // Convert canvas to base64 string
  const dataURL = canvas.toDataURL('image/png');

  return dataURL;
};

function extractInitials(name: string): string {
  const names = name.split(' ');
  return (
    names[0].charAt(0) +
    (names.length > 1 ? names[names.length - 1].charAt(0) : '')
  );
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
