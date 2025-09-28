#!/usr/bin/perl -w

use strict;

sub process {
  my $filename = shift @_;

  my @words = ();
  my %seen = ();
  my @uniq_words = ();
  open F, $filename;
  while (<F>) {
    chop;
    $_ = "\u$_";
    push @words, $_;
  }
  close F;

  foreach my $word (@words) {
    push(@uniq_words, $word) unless $seen{$word}++;
  }

  open F, ">$filename";
  foreach my $word (sort @uniq_words) {
    print F "$word\n";
  }
  close F;
}

process "estab.adj";
process "estab.noun";
