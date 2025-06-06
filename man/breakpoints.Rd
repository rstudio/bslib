% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/breakpoints.R
\name{breakpoints}
\alias{breakpoints}
\title{Define breakpoint values}
\usage{
breakpoints(..., xs = NULL, sm = NULL, md = NULL, lg = NULL)
}
\arguments{
\item{...}{Other breakpoints (e.g., \code{xl}).}

\item{xs}{The default value to apply to the \code{xs} breakpoint. Note that this
breakpoint is generally equivalent to "all sizes" and is typically treated
as the base case or a value to apply by default across all breakpoints
unless overridden by a larger breakpoint.}

\item{sm}{Values to apply at the \code{sm} breakpoint.}

\item{md}{Values to apply at the \code{md} breakpoint.}

\item{lg}{Values to apply at the \code{lg} breakpoint.}
}
\description{
A generic constructor for responsive breakpoints.
}
\examples{
breakpoints(sm = c(4, 4, 4), md = c(3, 3, 6), lg = c(-2, 8, -2))

}
\references{
Bootstrap's
\href{https://getbootstrap.com/docs/5.3/layout/breakpoints/}{Breakpoints article}
provides more detail on breakpoints and how they are used and customized.
}
\seealso{
\code{breakpoints()} is used by \code{\link[=layout_columns]{layout_columns()}}.
}
