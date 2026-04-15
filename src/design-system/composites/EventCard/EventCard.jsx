import Badge from "../../primitives/Badge/Badge";
import Button from "../../primitives/Button/Button";
import Card from "../../primitives/Card/Card";
import Chip from "../../primitives/Chip/Chip";
import Typography from "../../primitives/Typography/Typography";
import styles from "./EventCard.module.css";

export default function EventCard({
  status = "DISPONIBLE",
  statusTone = "success",
  title = "Noche de Furia en el Nesta",
  genres = ["PUNK", "GRUNGE"],
  date = "15 MAY 2026",
  time = "23:00 HS",
  venue = "Robert Nesta Club",
  price = "$4.500",
  highlighted = false,
}) {
  return (
    <Card highlighted={highlighted} className={styles.card}>
      <div className={styles.media}>
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=60"
          alt={title}
        />
        <div className={styles.topBar}>
          <Badge tone={statusTone}>{status}</Badge>
          <span className={styles.price}>{price}</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.chips}>
          {genres.map((genre) => (
            <Chip key={genre}>{genre}</Chip>
          ))}
        </div>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="caption">{date}</Typography>
        <Typography variant="caption">{time}</Typography>
        <Typography variant="caption">{venue}</Typography>
        <div className={styles.actions}>
          <Button variant="ghost" size="sm">
            Ver más
          </Button>
        </div>
      </div>
    </Card>
  );
}
