import { Plane, Palmtree, Sun, Waves } from 'lucide-react';

export default function LogoIcon({ size = 45 }) {
  return (
    <div style={{ 
      position: 'relative', 
      width: size, 
      height: size, 
      borderRadius: '50%', 
      backgroundColor: 'var(--accent)', 
      border: '2px solid var(--primary)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden', 
      flexShrink: 0 
    }}>
      <Palmtree size={size*0.4} color='var(--primary)' style={{ position: 'absolute', left: '10%', bottom: '15%' }} />
      <Plane size={size*0.35} color='var(--primary)' style={{ position: 'absolute', right: '15%', top: '15%', transform: 'rotate(45deg)' }} />
      <Sun size={size*0.3} color='var(--primary)' style={{ position: 'absolute', right: '15%', bottom: '15%' }} />
      <Waves size={size*0.5} color='var(--primary)' style={{ position: 'absolute', left: '20%', bottom: '-10%' }} />
      <svg width='100%' height='100%' style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
        <path d={`M 5 ${size*0.5} Q ${size*0.4} ${size*0.8} ${size*0.9} ${size*0.3}`} fill='none' stroke='var(--primary)' strokeWidth='1.5' markerEnd='url(#arrow)' />
        <defs>
          <marker id='arrow' viewBox='0 0 10 10' refX='5' refY='5' markerWidth='3' markerHeight='3' orient='auto-start-reverse'>
            <path d='M 0 0 L 10 5 L 0 10 z' fill='var(--primary)' />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
