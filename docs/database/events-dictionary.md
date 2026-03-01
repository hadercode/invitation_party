# Data Dictionary: Event Configuration Module

**Entity:** `events`
**Description:** Stores the core information and configuration of the social event (Titles, dates, logistics).

| Field | Data Type | Constraints | Business Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | PK, DEFAULT | Unique internal identifier for the event record. |
| `title` | `TEXT` | NOT NULL | Main heading of the event (e.g., "Mis Quince Años"). |
| `subtitle` | `TEXT` | | Secondary heading or name of the host (e.g., "Natalia Castillo"). |
| `event_date` | `DATE` | NOT NULL | The specific day the event takes place. |
| `start_time` | `TIME` | NOT NULL | Scheduled start time. |
| `end_time` | `TIME` | NOT NULL | Scheduled conclusion time. |
| `venue_name` | `TEXT` | NOT NULL | The official name of the venue or hall. |
| `city_location` | `TEXT` | NOT NULL | Descriptive text of the city/neighborhood location. |
| `google_maps_url` | `TEXT` | | Source URL for the interactive map iframe. |
| `created_at` | `TIMESTAMPTZ` | NOT NULL | Timestamp when the event record was first created. |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL | Timestamp of the last update to the record. |
| `deleted_at` | `TIMESTAMPTZ` | | Soft-delete column; non-null values indicate inactive records. |
| `created_by_id` | `UUID` | | Reference to the administrative user who created the event. |

## Indices and Performance
*   `idx_events_date`: Optimized for searching events by date.
*   `idx_events_title`: Optimized for title-based searches.

## Business Rules
1.  **Immutability**: Once an event is past, changes to logistics should be audited or restricted.
2.  **Soft Delete**: Records are never physically deleted to maintain history.
3.  **Audit**: Every change updates `updated_at` automatically via trigger.
