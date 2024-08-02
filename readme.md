# Macro Storage Gauge

This is a Developer Tool that provides a visual representation of the remaining memory alloted to the Macro Editor.

As of August 1, 2024, the Macro Editor is able to store only 2mb of text across all macros. This seems small, but it's larger than you think :smiley:

If you're prolific Macro Developers like myself, then you may have run into this error

```
Unable to save macro: Max storage limit reached.
```

[![Storage WebUI Pop Up](/images/StorageError.png)](#)

It's easy to create a new macro ans start developing without thinking to clear some old work out. This Macro should help you gauge how much space you're using on the endpoint your working in.

## Disclaimer

- This macro does an approximation of how much information is stored. It may not be 100% accurate, but it's fairly close.
- This Macro in itself consumes space and is included in the evaluation process

## Installation
- Download the latest release
- Deploy the Macro via the
  - Direct WebUI
  - Webex Control Hub
  - Ce-Deploy
- Then Save and Activate

## UserGuide

As you develop and save your work against the endpoint, you'll see this message print to your console

[![Storage WebUI Pop Up](/images/StorageGauge.png)](#)

## How does it work

The Macro Collects all of the content across all of your installed macros, both Active and Inactive.

It then concatenates all the content into 1 object and then estimates how many kilobytes are consumed.

Then, using this information, print a progress bar, using emojis, into the console and the percentage used.