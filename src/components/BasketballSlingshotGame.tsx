import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  rotationSpeed: number;
}

interface NetPoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

interface GameState {
  score: number;
  isGoal: boolean;
  showCelebration: boolean;
}

export function BasketballSlingshotGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const netPointsRef = useRef<NetPoint[][]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragEnd, setDragEnd] = useState({ x: 0, y: 0 });
  const [ball, setBall] = useState<Ball | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [hasScored, setHasScored] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    isGoal: false,
    showCelebration: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Game constants
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 400;
  const SLINGSHOT_X = 100;
  const SLINGSHOT_Y = 300;
  const BALL_RADIUS = 14;
  const HOOP_X = 480;
  const HOOP_Y = 140;
  const HOOP_WIDTH = 55;
  const RIM_RADIUS = 6;
  const GROUND_Y = 355;
  const GRAVITY = 0.35;
  const POWER_MULTIPLIER = 0.18;
  const BOUNCE_DAMPING = 0.65;
  const FRICTION = 0.98;
  const NET_ROWS = 6;
  const NET_COLS = 8;

  // Check dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(!document.documentElement.classList.contains('light'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Initialize net points
  useEffect(() => {
    const netPoints: NetPoint[][] = [];
    const netDepth = 45;
    
    for (let row = 0; row <= NET_ROWS; row++) {
      netPoints[row] = [];
      const rowProgress = row / NET_ROWS;
      const rowWidth = HOOP_WIDTH - (HOOP_WIDTH - 25) * rowProgress;
      
      for (let col = 0; col <= NET_COLS; col++) {
        const colProgress = col / NET_COLS;
        const x = HOOP_X - rowWidth / 2 + rowWidth * colProgress;
        const y = HOOP_Y + netDepth * rowProgress;
        
        netPoints[row][col] = {
          x, y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
        };
      }
    }
    netPointsRef.current = netPoints;
  }, []);

  const resetBall = useCallback(() => {
    setBall(null);
    setIsFlying(false);
    setHasScored(false);
    setDragStart({ x: 0, y: 0 });
    setDragEnd({ x: 0, y: 0 });
  }, []);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isFlying) return;
    const pos = getMousePos(e);
    const dist = Math.sqrt((pos.x - SLINGSHOT_X) ** 2 + (pos.y - SLINGSHOT_Y) ** 2);
    
    if (dist < 60) {
      setIsDragging(true);
      setDragStart({ x: SLINGSHOT_X, y: SLINGSHOT_Y });
      setDragEnd(pos);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const pos = getMousePos(e);
    const dx = pos.x - SLINGSHOT_X;
    const dy = pos.y - SLINGSHOT_Y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 100;
    
    if (dist > maxDist) {
      setDragEnd({
        x: SLINGSHOT_X + (dx / dist) * maxDist,
        y: SLINGSHOT_Y + (dy / dist) * maxDist,
      });
    } else {
      setDragEnd(pos);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const dx = SLINGSHOT_X - dragEnd.x;
    const dy = SLINGSHOT_Y - dragEnd.y;
    
    if (Math.sqrt(dx * dx + dy * dy) > 15) {
      setBall({
        x: SLINGSHOT_X,
        y: SLINGSHOT_Y - 20,
        vx: dx * POWER_MULTIPLIER,
        vy: dy * POWER_MULTIPLIER,
        radius: BALL_RADIUS,
        rotation: 0,
        rotationSpeed: dx * 0.02,
      });
      setIsFlying(true);
      setHasScored(false);
    }
  };

  const getTrajectoryPoints = useCallback(() => {
    if (!isDragging) return [];
    
    const dx = SLINGSHOT_X - dragEnd.x;
    const dy = SLINGSHOT_Y - dragEnd.y;
    const vx = dx * POWER_MULTIPLIER;
    const vy = dy * POWER_MULTIPLIER;
    
    const points: { x: number; y: number }[] = [];
    let x = SLINGSHOT_X;
    let y = SLINGSHOT_Y - 20;
    let tempVx = vx;
    let tempVy = vy;
    
    for (let i = 0; i < 60; i++) {
      points.push({ x, y });
      x += tempVx;
      tempVy += GRAVITY;
      y += tempVy;
      
      if (y > GROUND_Y || x > CANVAS_WIDTH || x < 0) break;
    }
    
    return points;
  }, [isDragging, dragEnd]);

  // Backboard collision detection
  const checkBackboardCollision = useCallback((ballX: number, ballY: number, ballRadius: number, vx: number) => {
    const backboardLeft = HOOP_X + 20;
    const backboardRight = HOOP_X + 35;
    const backboardTop = HOOP_Y - 55;
    const backboardBottom = HOOP_Y + 35;
    
    // Check if ball hits the front face of backboard (coming from left)
    if (
      ballX + ballRadius > backboardLeft &&
      ballX - ballRadius < backboardRight &&
      ballY > backboardTop &&
      ballY < backboardBottom &&
      vx > 0 // Moving towards backboard
    ) {
      return { hit: true, side: 'front' as const };
    }
    
    return { hit: false, side: null };
  }, []);

  // Rim collision detection
  const checkRimCollision = useCallback((ballX: number, ballY: number, ballRadius: number) => {
    const leftRimX = HOOP_X - HOOP_WIDTH / 2;
    const rightRimX = HOOP_X + HOOP_WIDTH / 2;
    const rimY = HOOP_Y;
    
    // Left rim
    const leftDist = Math.sqrt((ballX - leftRimX) ** 2 + (ballY - rimY) ** 2);
    if (leftDist < ballRadius + RIM_RADIUS) {
      return { hit: true, rimX: leftRimX, rimY };
    }
    
    // Right rim
    const rightDist = Math.sqrt((ballX - rightRimX) ** 2 + (ballY - rimY) ** 2);
    if (rightDist < ballRadius + RIM_RADIUS) {
      return { hit: true, rimX: rightRimX, rimY };
    }
    
    return { hit: false, rimX: 0, rimY: 0 };
  }, []);

  // Check if ball went through hoop
  const checkGoal = useCallback((ballX: number, ballY: number, prevY: number) => {
    const hoopLeft = HOOP_X - HOOP_WIDTH / 2 + RIM_RADIUS + 5;
    const hoopRight = HOOP_X + HOOP_WIDTH / 2 - RIM_RADIUS - 5;
    
    if (
      ballX > hoopLeft &&
      ballX < hoopRight &&
      prevY < HOOP_Y + 5 &&
      ballY >= HOOP_Y + 5 &&
      ballY < HOOP_Y + 40
    ) {
      return true;
    }
    return false;
  }, []);

  // Animate net when ball passes through
  const animateNet = useCallback((ballX: number) => {
    const netPoints = netPointsRef.current;
    if (!netPoints.length) return;
    
    for (let row = 0; row <= NET_ROWS; row++) {
      for (let col = 0; col <= NET_COLS; col++) {
        const point = netPoints[row][col];
        const distX = ballX - point.x;
        const force = Math.max(0, 1 - Math.abs(distX) / 50) * 8;
        point.vx += (Math.random() - 0.5) * force;
        point.vy += force * 0.5;
      }
    }
  }, []);

  // Update net physics
  const updateNet = useCallback(() => {
    const netPoints = netPointsRef.current;
    if (!netPoints.length) return;
    
    for (let row = 0; row <= NET_ROWS; row++) {
      for (let col = 0; col <= NET_COLS; col++) {
        const point = netPoints[row][col];
        
        // Spring back to base position
        const dx = point.baseX - point.x;
        const dy = point.baseY - point.y;
        point.vx += dx * 0.15;
        point.vy += dy * 0.15;
        
        // Apply velocity with damping
        point.x += point.vx;
        point.y += point.vy;
        point.vx *= 0.85;
        point.vy *= 0.85;
      }
    }
  }, []);

  // Game loop
  useEffect(() => {
    if (!isFlying || !ball) return;

    const animate = () => {
      setBall((prev) => {
        if (!prev) return null;
        
        let newVx = prev.vx;
        let newVy = prev.vy + GRAVITY;
        let newX = prev.x + newVx;
        let newY = prev.y + newVy;
        let newRotation = prev.rotation + prev.rotationSpeed;
        let newRotationSpeed = prev.rotationSpeed;
        
        // Check backboard collision first
        const backboardHit = checkBackboardCollision(newX, newY, prev.radius, newVx);
        if (backboardHit.hit) {
          newVx = -Math.abs(newVx) * BOUNCE_DAMPING; // Bounce back left
          newX = HOOP_X + 20 - prev.radius - 1; // Push ball away from backboard
          newRotationSpeed = -newRotationSpeed * 0.7;
        }
        
        // Check rim collision
        const rimHit = checkRimCollision(newX, newY, prev.radius);
        if (rimHit.hit) {
          const angle = Math.atan2(newY - rimHit.rimY, newX - rimHit.rimX);
          const speed = Math.sqrt(newVx ** 2 + newVy ** 2);
          newVx = Math.cos(angle) * speed * BOUNCE_DAMPING;
          newVy = Math.sin(angle) * speed * BOUNCE_DAMPING;
          newX = rimHit.rimX + Math.cos(angle) * (prev.radius + RIM_RADIUS + 1);
          newY = rimHit.rimY + Math.sin(angle) * (prev.radius + RIM_RADIUS + 1);
          newRotationSpeed = -newRotationSpeed * 0.8;
        }
        
        // Ground bounce
        if (newY + prev.radius > GROUND_Y) {
          newY = GROUND_Y - prev.radius;
          newVy = -newVy * BOUNCE_DAMPING;
          newVx *= FRICTION;
          newRotationSpeed = newVx * 0.1;
          
          // Stop if velocity is very low
          if (Math.abs(newVy) < 1) {
            newVy = 0;
          }
        }
        
        // Wall bounces
        if (newX - prev.radius < 0) {
          newX = prev.radius;
          newVx = -newVx * BOUNCE_DAMPING;
        }
        if (newX + prev.radius > CANVAS_WIDTH) {
          newX = CANVAS_WIDTH - prev.radius;
          newVx = -newVx * BOUNCE_DAMPING;
        }
        
        // Check goal
        if (!hasScored && checkGoal(newX, newY, prev.y)) {
          setHasScored(true);
          animateNet(newX);
          setGameState((s) => ({
            ...s,
            score: s.score + 1,
            isGoal: true,
            showCelebration: true,
          }));
          setTimeout(() => {
            setGameState((s) => ({ ...s, showCelebration: false, isGoal: false }));
          }, 1500);
        }
        
        // Ball stopped or out of bounds
        const isStationary = Math.abs(newVx) < 0.1 && Math.abs(newVy) < 0.5 && newY >= GROUND_Y - prev.radius - 2;
        if (isStationary || newX < -50 || newX > CANVAS_WIDTH + 50) {
          setTimeout(resetBall, 800);
          return { ...prev, x: newX, y: newY, vx: 0, vy: 0, rotation: newRotation, rotationSpeed: 0 };
        }
        
        return {
          ...prev,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          rotation: newRotation,
          rotationSpeed: newRotationSpeed,
        };
      });
      
      updateNet();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isFlying, ball, checkGoal, checkRimCollision, checkBackboardCollision, resetBall, hasScored, animateNet, updateNet]);

  // Draw basketball with realistic look
  const drawBasketball = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    // Ball shadow
    ctx.save();
    ctx.translate(4, 4);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fill();
    ctx.restore();
    
    // Main ball gradient
    const gradient = ctx.createRadialGradient(-radius * 0.3, -radius * 0.3, 0, 0, 0, radius);
    gradient.addColorStop(0, "#FF9A3C");
    gradient.addColorStop(0.5, "#E85D04");
    gradient.addColorStop(1, "#9D0208");
    
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Ball outline
    ctx.strokeStyle = "#6A040F";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Ball lines
    ctx.strokeStyle = "#370617";
    ctx.lineWidth = 1.2;
    
    // Vertical line
    ctx.beginPath();
    ctx.moveTo(0, -radius);
    ctx.lineTo(0, radius);
    ctx.stroke();
    
    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(-radius, 0);
    ctx.lineTo(radius, 0);
    ctx.stroke();
    
    // Curved lines
    ctx.beginPath();
    ctx.arc(-radius * 0.35, 0, radius * 0.75, -Math.PI * 0.4, Math.PI * 0.4);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(radius * 0.35, 0, radius * 0.75, Math.PI * 0.6, Math.PI * 1.4);
    ctx.stroke();
    
    // Highlight
    ctx.beginPath();
    ctx.arc(-radius * 0.3, -radius * 0.3, radius * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fill();
    
    ctx.restore();
  };

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw sky gradient based on theme
    const skyGradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    if (isDarkMode) {
      skyGradient.addColorStop(0, "#0a1628");
      skyGradient.addColorStop(0.5, "#1a2744");
      skyGradient.addColorStop(1, "#2d3a52");
    } else {
      skyGradient.addColorStop(0, "#87CEEB");
      skyGradient.addColorStop(0.5, "#B0E0FF");
      skyGradient.addColorStop(1, "#E8F5FF");
    }
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw clouds (light mode only)
    if (!isDarkMode) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(150, 50, 25, 0, Math.PI * 2);
      ctx.arc(175, 45, 30, 0, Math.PI * 2);
      ctx.arc(200, 50, 25, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(450, 70, 20, 0, Math.PI * 2);
      ctx.arc(470, 65, 25, 0, Math.PI * 2);
      ctx.arc(490, 70, 20, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Stars for dark mode
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      const starPositions = [[100, 30], [200, 60], [350, 25], [450, 50], [550, 40], [80, 80], [520, 70]];
      starPositions.forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    // Draw ground with gradient
    const groundGradient = ctx.createLinearGradient(0, GROUND_Y, 0, CANVAS_HEIGHT);
    if (isDarkMode) {
      groundGradient.addColorStop(0, "#1a472a");
      groundGradient.addColorStop(1, "#0d2818");
    } else {
      groundGradient.addColorStop(0, "#4CAF50");
      groundGradient.addColorStop(1, "#2E7D32");
    }
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);
    
    // Ground line
    ctx.strokeStyle = isDarkMode ? "#2d5a3d" : "#388E3C";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
    ctx.stroke();
    
    // Draw Y-shaped slingshot with 3D effect
    ctx.save();
    
    // Slingshot shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.ellipse(SLINGSHOT_X + 5, GROUND_Y + 5, 25, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Main post with gradient
    const postGradient = ctx.createLinearGradient(SLINGSHOT_X - 10, 0, SLINGSHOT_X + 10, 0);
    postGradient.addColorStop(0, "#5D4037");
    postGradient.addColorStop(0.5, "#8D6E63");
    postGradient.addColorStop(1, "#4E342E");
    
    ctx.strokeStyle = postGradient;
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    
    ctx.beginPath();
    ctx.moveTo(SLINGSHOT_X, GROUND_Y);
    ctx.lineTo(SLINGSHOT_X, SLINGSHOT_Y + 30);
    ctx.stroke();
    
    // Left fork
    ctx.beginPath();
    ctx.moveTo(SLINGSHOT_X, SLINGSHOT_Y + 30);
    ctx.lineTo(SLINGSHOT_X - 28, SLINGSHOT_Y - 25);
    ctx.stroke();
    
    // Right fork
    ctx.beginPath();
    ctx.moveTo(SLINGSHOT_X, SLINGSHOT_Y + 30);
    ctx.lineTo(SLINGSHOT_X + 28, SLINGSHOT_Y - 25);
    ctx.stroke();
    
    ctx.restore();
    
    // Draw elastic band
    if (isDragging) {
      ctx.strokeStyle = "#8B4513";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      
      ctx.beginPath();
      ctx.moveTo(SLINGSHOT_X - 28, SLINGSHOT_Y - 25);
      ctx.lineTo(dragEnd.x, dragEnd.y);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(SLINGSHOT_X + 28, SLINGSHOT_Y - 25);
      ctx.lineTo(dragEnd.x, dragEnd.y);
      ctx.stroke();
    } else if (!isFlying) {
      ctx.strokeStyle = "#8B4513";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(SLINGSHOT_X - 28, SLINGSHOT_Y - 25);
      ctx.quadraticCurveTo(SLINGSHOT_X, SLINGSHOT_Y, SLINGSHOT_X + 28, SLINGSHOT_Y - 25);
      ctx.stroke();
    }
    
    // Draw trajectory preview
    // if (isDragging) {
    //   const points = getTrajectoryPoints();
    //   ctx.strokeStyle = isDarkMode ? "rgba(4, 5, 5, 0.5)" : "rgba(255, 100, 0, 0.6)";
    //   ctx.lineWidth = 2;
    //   ctx.setLineDash([2, 2]);
      
    //   ctx.beginPath();
    //   points.forEach((point, i) => {
    //     if (i === 0) ctx.moveTo(point.x, point.y);
    //     else ctx.lineTo(point.x, point.y);
    //   });
    //   ctx.stroke();
    //   ctx.setLineDash([]);
      
    //   ctx.fillStyle = isDarkMode ? "rgba(0, 255, 200, 0.7)" : "rgba(255, 100, 0, 0.8)";
    //   points.forEach((point, i) => {
    //     if (i % 4 === 0) {
    //       ctx.beginPath();
    //       ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    //       ctx.fill();
    //     }
    //   });
    // }
    
    // Draw backboard with 3D effect
    ctx.save();
    
    // Backboard shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(HOOP_X + 32, HOOP_Y - 48, 12, 85);
    
    // Backboard
    const boardGradient = ctx.createLinearGradient(HOOP_X + 20, 0, HOOP_X + 40, 0);
    boardGradient.addColorStop(0, "#E8E8E8");
    boardGradient.addColorStop(0.5, "#FFFFFF");
    boardGradient.addColorStop(1, "#D0D0D0");
    
    ctx.fillStyle = boardGradient;
    ctx.fillRect(HOOP_X + 20, HOOP_Y - 55, 15, 90);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(HOOP_X + 20, HOOP_Y - 55, 15, 90);
    
    // Backboard target square
    ctx.strokeStyle = "#FF3333";
    ctx.lineWidth = 3;
    ctx.strokeRect(HOOP_X + 2, HOOP_Y - 25, 22, 28);
    
    // Hoop pole with gradient
    const poleGradient = ctx.createLinearGradient(HOOP_X + 30, 0, HOOP_X + 45, 0);
    poleGradient.addColorStop(0, "#555");
    poleGradient.addColorStop(0.5, "#888");
    poleGradient.addColorStop(1, "#444");
    
    ctx.fillStyle = poleGradient;
    ctx.fillRect(HOOP_X + 30, HOOP_Y + 35, 10, GROUND_Y - HOOP_Y - 35);
    
    ctx.restore();
    
    // Draw 3D hoop rim
    ctx.save();
    
    // Rim shadow
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = RIM_RADIUS * 2 + 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(HOOP_X - HOOP_WIDTH / 2 + 3, HOOP_Y + 3);
    ctx.lineTo(HOOP_X + HOOP_WIDTH / 2 + 3, HOOP_Y + 3);
    ctx.stroke();
    
    // Rim with gradient
    const rimGradient = ctx.createLinearGradient(0, HOOP_Y - RIM_RADIUS, 0, HOOP_Y + RIM_RADIUS);
    rimGradient.addColorStop(0, "#FF6B35");
    rimGradient.addColorStop(0.5, "#FF4500");
    rimGradient.addColorStop(1, "#CC3700");
    
    ctx.strokeStyle = rimGradient;
    ctx.lineWidth = RIM_RADIUS * 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(HOOP_X - HOOP_WIDTH / 2, HOOP_Y);
    ctx.lineTo(HOOP_X + HOOP_WIDTH / 2, HOOP_Y);
    ctx.stroke();
    
    // Rim highlights
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(HOOP_X - HOOP_WIDTH / 2, HOOP_Y - 2);
    ctx.lineTo(HOOP_X + HOOP_WIDTH / 2, HOOP_Y - 2);
    ctx.stroke();
    
    // Rim end circles
    ctx.fillStyle = "#FF4500";
    ctx.beginPath();
    ctx.arc(HOOP_X - HOOP_WIDTH / 2, HOOP_Y, RIM_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(HOOP_X + HOOP_WIDTH / 2, HOOP_Y, RIM_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
    
    // Draw animated net
    const netPoints = netPointsRef.current;
    if (netPoints.length > 0) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 1.5;
      
      // Vertical net lines
      for (let col = 0; col <= NET_COLS; col++) {
        ctx.beginPath();
        for (let row = 0; row <= NET_ROWS; row++) {
          const point = netPoints[row][col];
          if (row === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
      }
      
      // Horizontal net lines
      for (let row = 1; row <= NET_ROWS; row++) {
        ctx.beginPath();
        for (let col = 0; col <= NET_COLS; col++) {
          const point = netPoints[row][col];
          if (col === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
      }
    }
    
    // Draw ball on slingshot
    if (!isFlying && !ball) {
      const ballX = isDragging ? dragEnd.x : SLINGSHOT_X;
      const ballY = isDragging ? dragEnd.y : SLINGSHOT_Y - 20;
      drawBasketball(ctx, ballX, ballY, BALL_RADIUS, 0);
    }
    
    // Draw flying ball
    if (ball) {
      drawBasketball(ctx, ball.x, ball.y, ball.radius, ball.rotation);
    }
    
    // Draw score with better styling
    ctx.save();
    ctx.fillStyle = isDarkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.8)";
    ctx.roundRect(15, 12, 120, 40, 8);
    ctx.fill();
    
    ctx.fillStyle = isDarkMode ? "#00ffc8" : "#1a73e8";
    ctx.font = "bold 22px 'Inter', Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${gameState.score}`, 25, 40);
    ctx.restore();
    
  }, [ball, isDragging, dragEnd, isFlying, gameState.score, isDarkMode]);

  return (
    <div className="relative">
      <div className="bg-card rounded-2xl p-6">
        <div className="text-center mb-4">
          <p className="text-muted-foreground text-sm font-medium">
            🏀 Drag the ball to aim, release to shoot!
          </p>
        </div>
        
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="rounded-xl cursor-crosshair max-w-full border border-border/50"
            style={{ touchAction: "none" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          />
        </div>
        
        {gameState.showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-primary/90 text-primary-foreground px-8 py-4 rounded-2xl shadow-2xl">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-center"
              >
                <span className="text-4xl font-bold">🎉 GOAL! 🎉</span>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={resetBall}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Reset Ball
          </button>
          <button
            onClick={() => setGameState({ score: 0, isGoal: false, showCelebration: false })}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
          >
            Reset Score
          </button>
        </div>
      </div>
    </div>
  );
}
