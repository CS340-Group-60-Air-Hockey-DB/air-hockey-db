# Change Log

Any notable changes to the project will be noted here.

The types of changes in the log are as follows:
  
&emsp;&emsp;**Added:** new features

&emsp;&emsp;**Changed:** changes in existing functionality

&emsp;&emsp;**Deprecated:** soon-to-be removed features

&emsp;&emsp;**Removed:** now removed features

&emsp;&emsp;**Fixed:** any bug fixes

&emsp;&emsp;**Security:** in case of vulnerabilities

## Citations

The change log file format is adapted from [juampynr on gitHub.](https://gist.github.com/juampynr/4c18214a8eb554084e21d6e288a18a2c)

It utilizes the article [Keep a Changelog](http://keepachangelog.com/) for the format, and the project adheres to [Semantic Versioning](http://semver.org/).

## Version 0.0.0

### 2-05-2026: Step 2 Draft

#### Added

* Normalization to the Fixes section in the [PDF document](public/pdf-document/air-hockey-db-step-2-draft.pdf)
* [Schema](public/images/air-hockey-v2-schema.jpg) for database
* Based on normalization to make the database 3NF we added:
  * `player_order` attribute to `player_matches`
* Database folder with insert, query, + table folders
* Created SQL files + code to:
  * Create all the tables that are in the PDF document
  * Insert data into the tables
* Created a DDL SQL file to combine all table + insert SQL files into one in order to turn it in

#### Changed

* [ERD](public/images/air-hockey-v2-erd-dark.jpeg) with additions, deletions, and changes stated
* "Actions Based on Feedback" heading to "Fixes based on Feedback from Step 1" in the PDF document

#### Removed

* Based on normalization to make the database 3NF we removed:
  * `is_winner` from `player_matches`
  * `winner_id` from `games`
  * `match_id` from `match_officials`

### 1-23-2026: Step 1 Final

#### Added

* Feedback from our TA and peers to the [PDF document](public/pdf-document/air-hockey-db-step-1-final.pdf)
* A section for actions based on the feedback given
  * Includes reasoning on why we didn't use some suggestions
* `zip_code` attribute to the `locations` entity in the document
* DOB information for the `people` entity (originally `players`).

#### Changed

* Attribute names to be all singular for consistent naming conventions
* All `zip_code` attributes to a varchar(255)
* The `players` entity to `people`, in case there are people associated with Air Hockey that are not an Air
Hockey player
* All `varchar` attributes to have a character limit
* The relationship between `people` (originally `players`) + `locations`
* [ERD](public/images/air-hockey-erd-v1-updated-dark.jpg) with additions, deletions, and changes stated

#### Removed

* `sets_reffed` in the `match_officials` entity.

### 1-13-2026: Step 1 Draft

#### Added

* Created a [PDF document](public/pdf-document/air-hockey-db-step-1-draft.pdf) with an overview of the project, the database outline, and an [entity-relationship diagram (ERD)](public/images/air-hockey-erd-v1-dark.jpeg) with citations
