import { ImageResponse } from 'next/og';
import { Card } from '../../../components/Card';
import { CARD_DIMENSIONS } from '../../../config';

export async function GET() {
  return new ImageResponse(
    <Card message="Claim your Surfy onchain card!" />,
    CARD_DIMENSIONS,
  );
}
